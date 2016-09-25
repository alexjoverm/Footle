import { IAppointment } from './appointment'


export interface IUser {
  name: string,
  email: string,
  avatar: string,
  role: string,
  appointments?: IAppointment[]
}
