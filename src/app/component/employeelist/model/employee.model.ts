export interface ApiResponse<T>{
    status:boolean;
    message:string;
    data:T
}

export interface Employee {
  id: number;
  admin_id: number;
  name: string;
  email: string;
  emp_code: string;
  department_id: number;
  desigination: string;
  date_of_join: string;
  image: string | null;
  is_delete: number;
  created_at: string;
  updated_at: string;
}

export interface EmployeeListResponse {
  status: number;
  message: string;
  data: Employee[];
}

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  department_id: number;
  desigination: string;
  date_of_join: string;
  image: string | null;
}

export interface CreateEmployeeResponse {
  status: number;
  message: string;
  data: Employee;
}

export interface ToggleEmployeeRequest {
  is_delete: boolean;
}

export interface ToggleEmployeeResponse {
  status: number;
  message: string;
  data: null;
}