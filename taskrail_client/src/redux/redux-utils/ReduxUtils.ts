import { Dispatch } from "react";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import ReduxAction from "../modules/ReduxAction";
import { RootState } from "../store";

export type AppDispatch = ThunkDispatch<RootState, void, AnyAction> & Dispatch<ReduxAction>;
