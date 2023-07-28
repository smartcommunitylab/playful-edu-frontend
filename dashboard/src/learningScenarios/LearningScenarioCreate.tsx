import { Create, ReferenceArrayInput, SimpleForm, TextInput, required, useRedirect, useStore } from "react-admin"
import { DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from 'react-router-dom';
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const LearningScenarioCreate = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/scenarios?${DOMAIN_URL_PARAM}=${domainId}`);
    };
    return (
        <Create mutationOptions={{ onSuccess }} transform={(data: any) => ({ ...data, domainId })}>
        <BackButton />
 <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="desc" />
            <TextInput source="language" />
            <ReferenceArrayInput source="educators" reference="educators" queryOptions={{ meta: { domainId } }}/>
            <ReferenceArrayInput source="learners" reference="learners" queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
    </Create>
    )
}
