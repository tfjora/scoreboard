import { useEffect, useState } from 'react';

import { ComponentStatus } from '../_models/Fetch';
/**
 * Used for making get calls to the api
 * @param {() => Promise<ResponseType> | null} requestFunction - Async function
 * @param {boolean} skip - Optional skip initial fetch
 *
 * @returns error, status, data, retry
 */
const useAsyncFetch = (requestFunction: () => void, skip: boolean) => {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [status, setStatus] = useState(ComponentStatus.fetching);
    async function fetch(request: any) {
        try {
            const response = await request();
            setData(response);
            setStatus(ComponentStatus.loaded);
        } catch (error) {
            setError(error as any);
            setStatus(ComponentStatus.error);
        }
    }
    useEffect(() => {
        if (skip) {
            setStatus(ComponentStatus.loaded);
        } else {
            fetch(requestFunction);
        }
    }, []);
    function retry(retryRequest: any) {
        setStatus(ComponentStatus.reFetching);
        fetch(retryRequest ? retryRequest : requestFunction);
    }
    return [error, status, data, retry];
};
export default useAsyncFetch;
//# sourceMappingURL=useAsyncFetch.js.map
