//src/auth/interfaces/authenticated-user.interface.ts
import { UserRole } from '../../platform-saas/users/constants/role.enum';
import { Scope } from '../../platform-saas/users/constants/scope.enum';
export interface AuthenticatedUser {
  id: number;
  email: string;
  role: UserRole;
  scope: Scope;
  merchant: {
    id: number;
  };
}
