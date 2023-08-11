import { Edit, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useParams } from 'react-router-dom';

export const LearnerEdit = () => {
    const params = useParams();
    const domainId =params.domainId;
    const PostEditActions = () => {
        const recordId = useGetRecordId();
        const params = useParams();
        const domainId =params.domainId;
        const to=`/learners/d/${domainId}/${recordId}`;
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
    return (
        <Edit actions={<PostEditActions />} transform={(data: any) => ({ ...data, domainId })}>
            <SimpleForm>
            <TextInput source="firstname" validate={[required()]} fullWidth label="resources.learner.firstname" />
            <TextInput source="lastname" multiline={true} label="resources.learner.lastname" />
            <TextInput source="email" label="resources.learner.email"/>
        </SimpleForm>
        </Edit>
    )
}
