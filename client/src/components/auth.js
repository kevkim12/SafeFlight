const USERS_KEY = "safeFlightUsers";
const SESSION_KEY = "safeFlightSession";

const encoder = new TextEncoder();

const bytesToHex = (bytes) => {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch (error) {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const createSalt = () => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
};

const hashPassword = async (password, salt) => {
  const payload = encoder.encode(`${salt}:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", payload);
  return bytesToHex(new Uint8Array(hash));
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch (error) {
    return null;
  }
};

export const isSignedIn = () => Boolean(getCurrentUser());

export const createAccount = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account already exists for that email.");
  }

  const salt = createSalt();
  const passwordHash = await hashPassword(password, salt);
  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    salt,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, user]);
  return signIn({ email: normalizedEmail, password });
};

export const signIn = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = getUsers().find((storedUser) => storedUser.email === normalizedEmail);

  if (!user) {
    throw new Error("No account found for that email.");
  }

  const passwordHash = await hashPassword(password, user.salt);
  if (passwordHash !== user.passwordHash) {
    throw new Error("The password does not match this account.");
  }

  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.removeItem("user");
  return session;
};

export const signOut = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("user");
};
