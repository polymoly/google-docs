import { Socket } from "dgram";
import Quill from "quill";

export interface InitialState {
  socket: Socket | undefined;
  quill: Quill | undefined;
  loading: boolean;
  error: string;
}
