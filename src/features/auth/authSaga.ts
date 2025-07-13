import { put, takeLatest, fork, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import * as api from '@/common/http/request';
import { API_ENDPOINTS } from '@/constants/constants';
import {
  loginFail,
  loginSuccess,
  loginRequest,
  logoutRequest,
} from './authSlice';
import { UnknownAction } from 'redux';

// import { navigateTo } from "@/utils/navigation";

function* func(action: UnknownAction): SagaIterator {
  try {
    // yield delay(1000);
    // console.log("Saga Payload", { type: action.type, payload: action.payload });
    const type = action.type;
    const payload = action.payload;
    switch (type) {
      case loginRequest.type: {
        const res = yield call(api.post, API_ENDPOINTS.LOGIN, payload);
        let response = res?.response;
        if (response?.status == 200) {
          yield put(loginSuccess(response?.data));
          //   toast.success(TOAST_TITLE.SUCCESS, {
          //     description: response?.data?.message,
          //     duration: 3000,
          //   });
          //   navigateTo("/", { replace: true });
        } else {
          console.log('error', response.response.data);
          let errMsg = response?.response?.data?.message;
          let status = response?.status;
          //   toast.error(status, {
          //     description: errMsg,
          //     duration: 3000,
          //   });
          yield put(
            loginFail({
              message: `${status ?? 500}: ${errMsg ?? 'Unknown error'}`,
            }),
          );
          //   navigateTo("/login", { replace: true });
        }
        break;
      }

      case 'auth/logoutRequest': {
        yield call(api.post, API_ENDPOINTS.LOGIN);
        yield put({ type: 'reset' });
        break;
      }

      default:
        console.warn('Unhandled action type:', type);
    }
  } catch (error) {
    yield put(
      loginFail({
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      }),
    );
  }
}

function* watchFunc() {
  //Params: Actions, Saga Function
  yield takeLatest([loginRequest, logoutRequest], func);
}

export default function* root() {
  yield fork(watchFunc);
}
