import { Create, ReferenceArrayInput, SimpleForm, TextInput, required, useStore } from "react-admin"
import {  DOMAIN_URL_PARAM } from "../constants";
import { useSearchParams } from "react-router-dom";
import { BackButton } from "@smartcommunitylab/ra-back-button";

export const CompetencesCreate = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const domainId = searchParams.get(DOMAIN_URL_PARAM);
        return (
        <Create redirect="list" transform={(data: any) => ({ ...data, domainId })}>
        <BackButton />
 <SimpleForm>
        <TextInput source="title" label="resources.competence.title" validate={[required()]} fullWidth />
        <TextInput source="desc" label="resources.competence.description" />
        {/* <TextInput source="type" /> */}
         <ReferenceArrayInput source="concepts" reference="concepts"  queryOptions={{ meta: { domainId } }}/>
        </SimpleForm>
    </Create>
    )
}
