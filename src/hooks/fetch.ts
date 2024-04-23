'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = (p: any) => {
    const [route, setRoute] = useState(p?.route || '');
    const [method, setMethod] = useState(p?.method || 'get');
    const [params, setParams] = useState(p?.params || {});
    const autoDispatch =
        p?.autoDispatch === undefined || p?.autoDispatch === true;

    const [error, setError] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const api = axios.create();

    api.interceptors.request.use((config) => {
        setLoading(true);
        return config;
    });

    api.interceptors.response.use((response) => {
        setLoading(false);
        setData(response?.data);
        return response;
    });

    const fetch = (x: any = {}) => {
        setLoading(true);
        const newMethod = x.method || method;
        const newRoute = x.route || route;
        const newParams = x.params || params;
        setMethod(newMethod);
        setRoute(newRoute);
        setParams(newRoute);
        x.route && setRoute(x.route);
        x.params && setRoute(x.params);
        try {
            (api as any)?.[newMethod](newRoute, { ...newParams });
        } catch (e) {
            setError(e);
        }
    };

    useEffect(() => {
        if (autoDispatch && route) {
            fetch({
                method: method,
                route: route,
                params: params
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        data,
        loading,
        fetch,
        setRoute,
        setMethod,
        setParams,
        error
    };
};
