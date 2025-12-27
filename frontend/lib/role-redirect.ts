/**
 * Role-Based Redirect Utility
 * 
 * Centralized mapping of user roles to their dashboard routes.
 * Easy to extend with new roles in the future.
 */

// Role to dashboard route mapping
export const ROLE_REDIRECT_MAP: Record<string, string> = {
  user: "/dashboard",
  therapist: "/therapist/dashboard",
  buddy: "/buddy/dashboard",
} as const

// Fallback routes
export const FALLBACK_ROUTES = {
  unknown: "/onboarding",
  unauthenticated: "/login",
  default: "/dashboard",
} as const

// Valid roles
export const VALID_ROLES = ["user", "therapist", "buddy"] as const
export type UserRole = typeof VALID_ROLES[number]

/**
 * Get the dashboard route for a given role
 * @param role - The user's role
 * @returns The appropriate dashboard route
 */
export function getDashboardRoute(role: string | null | undefined): string {
  if (!role) {
    console.warn("No role provided, redirecting to default dashboard")
    return FALLBACK_ROUTES.default
  }

  const normalizedRole = role.toLowerCase().trim()
  
  if (normalizedRole in ROLE_REDIRECT_MAP) {
    return ROLE_REDIRECT_MAP[normalizedRole]
  }

  console.warn(`Unknown role: ${role}, redirecting to onboarding`)
  return FALLBACK_ROUTES.unknown
}

/**
 * Check if a role is valid
 * @param role - The role to validate
 * @returns Whether the role is valid
 */
export function isValidRole(role: string | null | undefined): role is UserRole {
  if (!role) return false
  return VALID_ROLES.includes(role.toLowerCase() as UserRole)
}

/**
 * Get display name for a role
 * @param role - The user's role
 * @returns Human-readable role name
 */
export function getRoleDisplayName(role: string): string {
  const displayNames: Record<string, string> = {
    user: "User",
    therapist: "Therapist",
    buddy: "Peer Buddy",
  }
  return displayNames[role.toLowerCase()] || "Unknown"
}
