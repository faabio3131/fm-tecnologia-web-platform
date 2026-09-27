export type IronFitTenantOption = {
  id: string;
  name: string;
};

export type IronFitSessionUser = {
  id: string;
  email: string;
  name: string;
  roles: string[];
  permissions: string[];
  gymId: string | null;
  activeGymId: string | null;
  isSuperAdmin: boolean;
  scope: string;
};

export type IronFitLoginSelection = {
  requires_tenant_selection: true;
  tenants: IronFitTenantOption[];
  user: Pick<IronFitSessionUser, "id" | "email" | "name">;
};

export type IronFitLoginSuccess = {
  requires_tenant_selection: false;
  access_token: string;
  refresh_token: string;
  user: IronFitSessionUser;
};

export type IronFitRefreshSuccess = {
  requires_tenant_selection: false;
  access_token: string;
  refresh_token: string;
};

export type IronFitLoginResponse = IronFitLoginSelection | IronFitLoginSuccess;
