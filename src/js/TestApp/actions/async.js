import 'whatwg-fetch'
import Promise from 'promise-polyfill'

if (!window.Promise) {
    window.Promise = Promise
}

export function dataHasErrored(bool) {
    return {
        type: 'DATA_HAS_ERRORED',
        hasErrored: bool,
    }
}

export function worldIsLoading(bool) {
    return {
        type: 'DATA_IS_LOADING',
        isLoading: bool,
    }
}

export function fetchDataSuccess(data) {
    return {
        type: 'FETCH_DATA_SUCCESS',
        data,
    }
}

export function fetchData(url) {
    return (dispatch) => {
        dispatch(worldIsLoading(true))
        fetch(url, { credentials: 'same-origin' })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText)
                }
                dispatch(worldIsLoading(false))
                return response
            })
            .then(response => response.json())
            .then((world) => {
                dispatch(fetchDataSuccess(world))
            })
            .catch(() => dispatch(dataHasErrored(true)))
    }
}
