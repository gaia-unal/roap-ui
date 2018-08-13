import React from 'react';
import {
    Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput,
    LongTextInput, ReferenceManyField, Datagrid, DateField, EditButton
} from 'react-admin';

export const LearningObjectEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="category" />
            <TextInput source="created" />
            <TextInput source="modified" />
            <TextInput source="deleted" />
            <TextInput source="evaluated" />
            <TextInput source="file_name" />
            {/*<TextInput source="rating" />*/}
            <TextInput source="metadata.general.identifier.catalog" />
            <TextInput source="metadata.general.identifier.entry" />
            <TextInput source="metadata.general.title" />
            <TextInput source="metadata.general.language" />
            <TextInput source="metadata.general.description" />
            <TextInput source="metadata.general.keyword" />
            <TextInput source="metadata.general.coverage" />
            <TextInput source="metadata.general.structure" />
            <TextInput source="metadata.general.aggregationlevel" />
            <TextInput source="metadata.lifecycle.version" />
            <TextInput source="metadata.lifecycle.status" />
            <TextInput source="metadata.lifecycle.contribute.role" />
            <TextInput source="metadata.lifecycle.contribute.date" />
            <TextInput source="metadata.lifecycle.contribute.entity" />
            <TextInput source="metadata.metametadata.identifier.catalog" />
            <TextInput source="metadata.metametadata.identifier.entry" />
            <TextInput source="metadata.metametadata.contribute.role" />
            <TextInput source="metadata.metametadata.contribute.date" />
            <TextInput source="metadata.metametadata.contribute.entity" />
            <TextInput source="metadata.metametadata.metadataschema" />
            <TextInput source="metadata.metametadata.language" />
            <TextInput source="metadata.technical.format" />
            <TextInput source="metadata.technical.size" />
            <TextInput source="metadata.technical.location" />
            <TextInput source="metadata.technical.requirements.orcomposite.type" />
            <TextInput source="metadata.technical.requirements.orcomposite.name" />
            <TextInput source="metadata.technical.requirements.orcomposite.minimumversion" />
            <TextInput source="metadata.technical.requirements.orcomposite.maximumversion" />
            <TextInput source="metadata.technical.installationremarks" />
            <TextInput source="metadata.technical.otherplatformrequirements" />
            <TextInput source="metadata.technical.duration" />
            <TextInput source="metadata.educational.interactivitytype" />
            <TextInput source="metadata.educational.learningresourcetype" />
            <TextInput source="metadata.educational.interactivitylevel" />
            <TextInput source="metadata.educational.semanticdensity" />
            <TextInput source="metadata.educational.intendedenduserrole" />
            <TextInput source="metadata.educational.context" />
            <TextInput source="metadata.educational.typicalagerange" />
            <TextInput source="metadata.educational.difficulty" />
            <TextInput source="metadata.educational.typicallearningtime" />
            <TextInput source="metadata.educational.description" />
            <TextInput source="metadata.educational.language" />
            <TextInput source="metadata.rights.cost" />
            <TextInput source="metadata.rights.copyrightandotherrestrictions" />
            <TextInput source="metadata.rights.description" />
            <TextInput source="metadata.relation.kind" />
            <TextInput source="metadata.relation.resource.identifier.catalog" />
            <TextInput source="metadata.relation.resource.identifier.entry" />
            <TextInput source="metadata.relation.resource.description" />
            <TextInput source="metadata.annotation.entity" />
            <TextInput source="metadata.annotation.date" />
            <TextInput source="metadata.annotation.description" />
            <TextInput source="metadata.classification.purpose" />
            <TextInput source="metadata.classification.taxonPath.source=" />
            <TextInput source="metadata.classification.taxonPath.taxon.id" />
            <TextInput source="metadata.classification.taxonPath.taxon.entry" />
            <TextInput source="metadata.classification.description" />
            <TextInput source="metadata.classification.keyword" />
        </SimpleForm>
    </Edit>
);