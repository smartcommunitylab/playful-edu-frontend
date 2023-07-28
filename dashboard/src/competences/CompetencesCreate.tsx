import { Create, ReferenceArrayInput, SimpleForm, TextInput, required, useRedirect, useStore } from "react-admin"
import {  DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from "react-router-dom";
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const CompetencesCreate = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
    const redirect = useRedirect();
    const onSuccess = () => {
        redirect(`/competences?${DOMAIN_URL_PARAM}=${domainId}`);
    };
    return (
        <Create mutationOptions={{ onSuccess }} transform={(data: any) => ({ ...data, domainId })}>
        <BackButton />
 <SimpleForm>
        <TextInput source="title" label="resources.competence.title" validate={[required()]} fullWidth />
        <TextInput source="desc" label="resources.competence.description" />
         <ReferenceArrayInput source="concepts" reference="concepts"  queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
    </Create>
    )
}
