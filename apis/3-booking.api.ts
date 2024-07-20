import type { Booking } from "~/types/3-booking";
import type { UpdateResult } from "~/types/update-result";
import { authFetch, guestFetch } from "~/utils/fetch";
import type { FetchOptions, PaginationParams } from "~/utils/types";

const BOOKING_URL = "/bookings";
export const bookingApi = {
  //  ----- Method: GET -----
  paginate: (
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Booking[]> => {
    return guestFetch.get(`${BOOKING_URL}/paginate`, query, options);
  },

  getById: (
    id: string,
    query?: PaginationParams,
    options?: FetchOptions,
  ): Promise<Booking> => {
    return authFetch.get(`${BOOKING_URL}/${id}`, query, options);
  },

  //  ----- Method: POST -----
  create: (body: Booking, options?: FetchOptions): Promise<Booking> => {
    return authFetch.post(BOOKING_URL, body, options);
  },

  //  ----- Method: PATCH -----
  updateById: (
    id: string,
    body: Booking,
    options?: FetchOptions,
  ): Promise<Booking> => {
    return authFetch.patch(`${BOOKING_URL}/${id}`, body, options);
  },

  //  ----- Method: DELETE -----
  deleteManyByIds: (ids: string[]): Promise<UpdateResult> => {
    return authFetch.delete(`${BOOKING_URL}/${ids.join(",")}/ids`);
  },

  deleteById: (id: string): Promise<Booking> => {
    return authFetch.delete(`${BOOKING_URL}/${id}`);
  },
};
