import { Edit, ReferenceArrayInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId, useRedirect, useStore } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from "react-router-dom";


const PostEditActions = () => {
    const recordId = useGetRecordId();
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const to=`/competences/${recordId}/show?${DOMAIN_URL_PARAM}=${domainId}`;
    if (!recordId)
        return null;
    return (
        <>
            <TopToolbar>
                <ShowButton  to={to}></ShowButton>
            </TopToolbar>
            </>
        )
};
export const CompetencesEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const redirect = useRedirect();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const onSuccess = () => {
        redirect(`/educators?${DOMAIN_URL_PARAM}=${domainId}`);
    };
    return (
        <Edit mutationOptions={{ onSuccess }} actions={<PostEditActions />} transform={(data: any) => ({ ...data, domainId })}>
           <SimpleForm >
        <TextInput source="title" label="resources.competence.title"  validate={[required()]} fullWidth />
        <TextInput source="desc" label="resources.competence.description"  />
        {/* <TextInput source="type" /> */}
         <ReferenceArrayInput source="concepts" reference="concepts" queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
        </Edit>
    )
}


