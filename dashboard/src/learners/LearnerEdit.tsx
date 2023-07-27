import { Edit, ShowButton, SimpleForm, TextInput, TopToolbar, required, useGetRecordId } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';

export const LearnerEdit = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const PostEditActions = () => {
        const recordId = useGetRecordId();
        const [searchParams, setSearchParams] = useSearchParams();
        const domainId = searchParams.get(DOMAIN_URL_PARAM);
        const to=`/learners/${recordId}/show?${DOMAIN_URL_PARAM}=${domainId}`;
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
