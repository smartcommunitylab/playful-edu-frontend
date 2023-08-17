import { BooleanField, ChipField, Datagrid, EditButton, ReferenceArrayField, Show, ShowButton, SimpleShowLayout, SingleFieldList, TextField, TopToolbar, useGetRecordId } from "react-admin"
import { useParams } from 'react-router-dom';
import { LearnerList } from "../learners/LearnerList";


const PostShowActions = () => {
    const recordId = useGetRecordId();
    const params = useParams();
    const domainId =params.domainId;
    const to=`/scenarios/d/${domainId}/s/${recordId}/edit`;
    if (!recordId)
        return null;
    return (
        <>
            <TopToolbar>
                <EditButton  to={to}></EditButton>
            </TopToolbar>
            </>
        )
};
export const LearnerScenarioList = () => {

}
export const LearningScenarioShow = () => {
    return (
        <Show actions={<PostShowActions />}>
            <SimpleShowLayout>
            <TextField source="title"  />
            <TextField source="desc" />
            <TextField source="language" />
            <BooleanField source="publicScenario" />
            <ReferenceArrayField label="Educators" reference="educators" source="educators" >
            <SingleFieldList linkType={false}>
              <ChipField source="email" />
            </SingleFieldList>
            </ReferenceArrayField>
        </SimpleShowLayout>
        </Show>
    )
}
