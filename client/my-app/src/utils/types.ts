export type House = {
  numRooms: number,
  numBathrooms: number,
  monthlyRent: number,
  numberVacancies: number,
  address: string,
  numParkingSpots: number,
  leaseStart: Date,
}

export type User = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNum: string,
}

export type Student = {
  user: User,
  houses: House[],
  bio?: string
  resumePath?: string,
  profilePicPath?: string,
  transcriptUploadPath?: string
}

export type Homeowner = {
  user: User,
  properties: House[],
  bio?: string,
}

export type AppState = {
  user: User,
  token: string,
  properties: House[]
}


export {};