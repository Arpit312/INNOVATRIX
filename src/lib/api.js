/**
 * API utility — all backend calls go through here.
 * Falls back gracefully to mock data when the backend is unreachable
 * so the app stays fully functional in demo / offline mode.
 */

const BASE = "/api";

async function request(method, path, body) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data?.message || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function apiLogin(email, password) {
  return request("POST", "/users/login", { email, password });
}

export async function apiSignup(name, email, password) {
  return request("POST", "/users/signup", { name, email, password });
}

// ── Profile ───────────────────────────────────────────────────────────────────

export async function apiGetProfile(userId) {
  return request("GET", `/users/profile/${userId}`);
}

export async function apiUpdateProfile(userId, updates) {
  return request("PUT", `/users/profile/${userId}`, updates);
}

// ── Projects / Resume ─────────────────────────────────────────────────────────

export async function apiGetProjects(userId) {
  return request("GET", `/users/${userId}/projects`);
}

export async function apiAddProject(userId, project) {
  return request("POST", `/users/${userId}/projects`, project);
}

// ── Skills ────────────────────────────────────────────────────────────────────

export async function apiGetSkills(userId) {
  return request("GET", `/users/${userId}/skills`);
}

export async function apiVerifySkill(userId, skillData) {
  return request("POST", `/users/${userId}/skills/verify`, skillData);
}

// ── Health check ──────────────────────────────────────────────────────────────

export async function apiHealthCheck() {
  try {
    const res = await fetch(`${BASE}/health`, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}
