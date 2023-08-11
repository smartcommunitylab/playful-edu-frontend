import { Edit, ReferenceArrayInput, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId, useRedirect, useStore } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from "react-router-dom";


const PostEditActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/competences/d/${domainId}/${recordId}`;
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
    const params = useParams();
    const redirect = useRedirect();
    const domainId =params.domainId;
    const onSuccess = () => {
        redirect(`/competences/d/${domainId}`);
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


