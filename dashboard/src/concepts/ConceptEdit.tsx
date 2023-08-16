import { DeleteButton, DeleteWithConfirmButton, Edit, SaveButton, ShowButton, SimpleForm, TextInput, Toolbar, TopToolbar, required, useGetRecordId, useRecordContext, useRedirect, useStore } from "react-admin"
import { useParams } from 'react-router-dom';
import { DOMAIN_URL_PARAM } from "../constants";

const PostEditActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/concepts/d/${domainId}/${recordId}`;
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
const EditToolbar = (props:any) => {
    const params = useParams();
    const domainId =params.domainId;
    const to=`/concepts/d/${domainId}`;
    return (<Toolbar {...props}>
        <SaveButton/>
        <DeleteButton
            redirect={to}
        />
    </Toolbar>
    )
};
export const ConceptEdit = () => {
    const params = useParams();
    const domainId =params.domainId;
    const redirect = useRedirect();

    const onSuccess = () => {
        redirect(`/concepts/d/${domainId}`);
    };
    return (
        <Edit mutationOptions={{ onSuccess }}  actions={<PostEditActions />} transform={(data: any) => ({ ...data, domainId })} mutationMode="pessimistic">
            <SimpleForm toolbar={<EditToolbar />}>
            <TextInput source="title" validate={[required()]} fullWidth />
        </SimpleForm>
        </Edit>
    )
}

