import { stringify } from 'querystring';
import { fetchUtils, DataProvider } from 'ra-core';

const springDataProvider = (
    apiUrl: string,
    httpClient: (
        url: any,
        options?: fetchUtils.Options | undefined
    ) => Promise<{
        status: number;
        headers: Headers;
        body: string;
        json: any;
    }>
): DataProvider => {
    return {
        getList: (resource, params) => {
            //handle pagination request as pageable (page,size)
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            let meta = undefined;
            let filter = undefined;
            if (params?.meta)
                meta = params?.meta;
            if (params?.filter)
                filter = params?.filter;


            let query: any = {
                sort: field + ',' + order, //sorting
                page: page - 1, //page starts from zero
                size: perPage,
            };
            if (meta?.domainId)
                query["domainId"] = meta?.domainId;
            if (meta?.learningScenarioId)
                query["learningScenarioId"] = meta?.learningScenarioId;
            if (meta?.learningModuleId)
                query["learningModuleId"] = meta?.learningModuleId;
            if (meta?.learningFragmentId)
                query["learningFragmentId"] = meta?.learningFragmentId;
                if (filter?.text)
                query["text"] = filter?.text;
                if (meta?.text)
                query["text"] = meta?.text;
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            return httpClient(url).then(({ status, json }) => {
                if (status !== 200) {
                    throw new Error('Invalid response status ' + status);
                }
                if (!json.content) {
                    throw new Error('the response must match page<> model');
                }

                //extract data from content
                return {
                    data: json.content,
                    total: parseInt(json.totalElements),
                };
            });
        },
        getOne: (resource, params) => {
            const url = `${apiUrl}/${resource}/${params.id}`;
            return httpClient(url).then(({ status, json }) => {
                if (status !== 200) {
                    throw new Error('Invalid response status ' + status);
                }
                return {
                    data: json,
                };
            });
        },
        getMany: (resource, params) => {
            const query = {
                ids: params.ids ? params.ids.join(',') : '',
            };

            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            return httpClient(url).then(({ status, json }) => {
                if (status !== 200) {
                    throw new Error('Invalid response status ' + status);
                }
                if (!json.content) {
                    throw new Error('the response must match page<> model');
                }

                return {
                    data: json.content,
                    total: parseInt(json.totalElements, 10),
                };
            });
        },
        getManyReference: (resource, params) => {
            throw new Error('Unsupported');
        },
        update: (resource, params) => {
            const url = `${apiUrl}/${resource}/${params.id}`;
            return httpClient(url, {
                method: 'PUT',
                body:
                    typeof params.data === 'string'
                        ? params.data
                        : JSON.stringify(params.data),
            }).then(({ json }) => ({ data: json }));
        },
        updateMany: (resource, params) => {
            const url = `${apiUrl}/${resource}`;

            //make a distinct call for every entry
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${url}/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(params.data),
                    })
                )
            ).then(responses => ({
                data: responses.map(({ json }) => json.id),
            }));
        },
        create: (resource, params) => {
            const url = `${apiUrl}/${resource}`;
            return httpClient(url, {
                method: 'POST',
                body:
                    typeof params.data === 'string'
                        ? params.data
                        : JSON.stringify(params.data),
            }).then(({ json }) => ({
                data: { ...params.data, id: json.id },
            }));
        },
        delete: (resource, params) => {
            const url = `${apiUrl}/${resource}/${params.id}`;

            return httpClient(url, {
                method: 'DELETE',
            }).then(({ json }) => ({ data: json }));
        },
        deleteMany: (resource, params) => {
            const url = `${apiUrl}/${resource}`;

            //make a distinct call for every entry
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${url}/${id}`, {
                        method: 'DELETE',
                    })
                )
            ).then(responses => ({ data: responses.map(({ json }) => json) }));
        },
    };
};

export default springDataProvider;