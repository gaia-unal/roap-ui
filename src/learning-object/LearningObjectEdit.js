import React from 'react';
import {
    TextInput, LongTextInput, TabbedForm, FormTab, Edit
} from 'react-admin';
import SchemaService from '../custom-services/schema';


export class LearningObjectEdit extends React.Component {
  constructor(props) {
    super(props);
    this.service = new SchemaService();
    this.state = {
      fetchingSchema: false,
      fields: [],
      error: null,
    }
  }

  generateNestedForm(lom, temp_keys=[], keys=[]) {
    for(var key in lom){
        if ('fields' in lom[key]) {
            temp_keys.push(key);
            this.generateNestedForm(lom[key].fields, temp_keys, keys)
            temp_keys.splice(-1,1);
        } else {
            keys.push({
                key: 'metadata.' + temp_keys.join('.') + '.' + key,
                type: lom[key].type,
                required: lom[key].required
            })
        }
    }
  }

  componentWillMount() {
    this.setState({fetchingSchema: true}, () => {
      this.service.getSchema(
        schema =>  {
            let fields = [];
            this.generateNestedForm(schema.lom, [], fields);
            this.setState({ fields });
        },
        error => this.setState({fetchingSchema: false, error}),
      )
    })
  }

  render() {
    console.log(this.state);
    return (
      <Edit {...this.props}>
        <TabbedForm>
          <FormTab label="summary">
            <TextInput source="category" />
            <TextInput source="created" />
            <TextInput source="modified" />
            <TextInput source="deleted" />
            <TextInput source="evaluated" />
            <TextInput source="file_name" />
          </FormTab>
          <FormTab label="metadata">
            {
                this.state.fields.map(
                    field => <LongTextInput source={field.key} />
                )
            }
            {/*<TextInput source="rating" />
            <LongTextInput source="metadata.general.identifier.catalog" />
            <LongTextInput source="metadata.general.identifier.entry" />
            <LongTextInput source="metadata.general.title" />
            <LongTextInput source="metadata.general.language" />
            <LongTextInput source="metadata.general.description" />
            <LongTextInput source="metadata.general.keyword" />
            <LongTextInput source="metadata.general.coverage" />
            <LongTextInput source="metadata.general.structure" />
            <LongTextInput source="metadata.general.aggregationlevel" />
            <LongTextInput source="metadata.lifecycle.version" />
            <LongTextInput source="metadata.lifecycle.status" />
            <LongTextInput source="metadata.lifecycle.contribute.role" />
            <LongTextInput source="metadata.lifecycle.contribute.date" />
            <LongTextInput source="metadata.lifecycle.contribute.entity" />
            <LongTextInput source="metadata.metametadata.identifier.catalog" />
            <LongTextInput source="metadata.metametadata.identifier.entry" />
            <LongTextInput source="metadata.metametadata.contribute.role" />
            <LongTextInput source="metadata.metametadata.contribute.date" />
            <LongTextInput source="metadata.metametadata.contribute.entity" />
            <LongTextInput source="metadata.metametadata.metadataschema" />
            <LongTextInput source="metadata.metametadata.language" />
            <LongTextInput source="metadata.technical.format" />
            <LongTextInput source="metadata.technical.size" />
            <LongTextInput source="metadata.technical.location" />
            <LongTextInput source="metadata.technical.requirements.orcomposite.type" />
            <LongTextInput source="metadata.technical.requirements.orcomposite.name" />
            <LongTextInput source="metadata.technical.requirements.orcomposite.minimumversion" />
            <LongTextInput source="metadata.technical.requirements.orcomposite.maximumversion" />
            <LongTextInput source="metadata.technical.installationremarks" />
            <LongTextInput source="metadata.technical.otherplatformrequirements" />
            <LongTextInput source="metadata.technical.duration" />
            <LongTextInput source="metadata.educational.interactivitytype" />
            <LongTextInput source="metadata.educational.learningresourcetype" />
            <LongTextInput source="metadata.educational.interactivitylevel" />
            <LongTextInput source="metadata.educational.semanticdensity" />
            <LongTextInput source="metadata.educational.intendedenduserrole" />
            <LongTextInput source="metadata.educational.context" />
            <LongTextInput source="metadata.educational.typicalagerange" />
            <LongTextInput source="metadata.educational.difficulty" />
            <LongTextInput source="metadata.educational.typicallearningtime" />
            <LongTextInput source="metadata.educational.description" />
            <LongTextInput source="metadata.educational.language" />
            <LongTextInput source="metadata.rights.cost" />
            <LongTextInput source="metadata.rights.copyrightandotherrestrictions" />
            <LongTextInput source="metadata.rights.description" />
            <LongTextInput source="metadata.relation.kind" />
            <LongTextInput source="metadata.relation.resource.identifier.catalog" />
            <LongTextInput source="metadata.relation.resource.identifier.entry" />
            <LongTextInput source="metadata.relation.resource.description" />
            <LongTextInput source="metadata.annotation.entity" />
            <LongTextInput source="metadata.annotation.date" />
            <LongTextInput source="metadata.annotation.description" />
            <LongTextInput source="metadata.classification.purpose" />
            <LongTextInput source="metadata.classification.taxonPath.source=" />
            <LongTextInput source="metadata.classification.taxonPath.taxon.id" />
            <LongTextInput source="metadata.classification.taxonPath.taxon.entry" />
            <LongTextInput source="metadata.classification.description" />
            <LongTextInput source="metadata.classification.keyword" />*/}
          </FormTab>
        </TabbedForm>
      </Edit>
    )
  }
}
