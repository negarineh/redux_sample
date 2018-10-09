import { userConstants } from '../_constants';
import { userService } from '../_services';

export const userActions = {
   getAll, 
};

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
        .then(
            users => dispatch(success(users)),
            error => dispatch(failure(error))
        );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users} }
    function failure(error) { return { type: userConstants.GETALL_FAILURE , error} }
}