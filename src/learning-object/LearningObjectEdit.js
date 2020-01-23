import React from 'react';
import {
  TabbedForm,
  FormTab,
  Edit,
  DateInput,
  TextField,
  DateField,
  FunctionField,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  BooleanInput,
  ReferenceInput,
  FormDataConsumer,
  TextInput,
  TabbedFormTabs,
  FormWithRedirect,
  NullableBooleanInput,
  SaveButton,
  DeleteButton,
  required
} from 'react-admin';
import { Field } from 'react-final-form';
import ChipInput from 'material-ui-chip-input';
import { CardContent, Typography, Box, Toolbar, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const renderChipInput = ({ input, label }) => (
  <ChipInput
    value={input.value}
    label={label}
    onAdd={chip => {
      return input.onChange([...input.value, chip]);
    }}
    onDelete={(chip, index) => {
      return input.onChange(input.value.filter(v => v !== chip));
    }}
  />
);

const ControlledExpansionPanels = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div >
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography >General</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12} ml={20}>
              <Typography>Identifier</Typography>
              <div style={{ marginLeft: 20 }}>
                <TextInput label="catalog" source="metadata.general.identifier.catalog" fullWidth />
                <TextInput label="entry" source="metadata.general.identifier.entry" fullWidth />
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextInput label="title" source="metadata.general.title" validate={required()} fullWidth />
              <TextInput label="language" source="metadata.general.language" fullWidth />
              <TextInput label="description" source="metadata.general.description" validate={required()} fullWidth />
              <Field label="keyword" name="metadata.general.keyword" component={renderChipInput} />
              <TextInput label="coverage" source="metadata.general.coverage" fullWidth />
              <TextInput label="structure" source="metadata.general.structure" fullWidth />
              <TextInput label="aggregationlevel" source="metadata.general.aggregation_level" fullWidth />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography >Lifecycle</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid item xs={12} ml={20}>
            <TextInput label="version" source="metadata.lifecycle.version" fullWidth />
            <TextInput label="status" source="metadata.lifecycle.status" fullWidth />
            <div style={{ marginLeft: 20 }}>
              <Typography>contribute</Typography>
              <TextInput label="role" source="metadata.lifecycle.contribute.role" fullWidth />
              <TextInput label="date" source="metadata.lifecycle.contribute.date" fullWidth />
              <TextInput label="entity" source="metadata.lifecycle.contribute.entity" fullWidth />
            </div>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography >metametadata</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid item xs={12} ml={20}>
            <Typography>identifier</Typography>
            <div style={{ marginLeft: 20 }}>
              <TextInput label="catalog" source="metadata.metametadata.identifier.catalog" fullWidth />
              <TextInput label="entry" source="metadata.metametadata.identifier.entry" fullWidth />
            </div>
            <Typography>contribute</Typography>
            <div style={{ marginLeft: 20 }}>
              <TextInput label="role" source="metadata.metametadata.contribute.role" fullWidth />
              <TextInput label="date" source="metadata.metametadata.contribute.date" fullWidth />
              <TextInput label="entity" source="metadata.metametadata.contribute.entity" fullWidth />
            </div>
            <TextInput label="metadataschema" source="metadata.metametadata.metadataschema" fullWidth />
            <TextInput label="language" source="metadata.metametadata.language" fullWidth />
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography>technical</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12} ml={20}>
              <Field label="format" name="metadata.technical.format" component={renderChipInput} />
              <TextInput label="size" source="metadata.technical.size" fullWidth />
              <TextInput label="location" source="metadata.technical.location" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Typography>requirements</Typography>
              <div style={{ marginLeft: 20 }}>
                <Typography>orcomposite</Typography>
                <div style={{ marginLeft: 20 }}>
                  <TextInput label="type" source="metadata.requirements.orcomposite.type" fullWidth />
                  <TextInput label="name" source="metadata.requirements.orcomposite.name" fullWidth />
                  <TextInput label="minimumversion" source="metadata.requirements.orcomposite.minimumversion" fullWidth />
                  <TextInput label="maximumversion" source="metadata.requirements.orcomposite.maximumversion" fullWidth />
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextInput label="installationremarks" source="metadata.technical.installationremarks" fullWidth />
              <TextInput label="otherplatformrequirements" source="metadata.technical.otherplatformrequirements" fullWidth />
              <TextInput label="duration" source="metadata.technical.duration" fullWidth />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography>educational</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <TextInput label="interactivitytype" source="metadata.educational.interactiviytype" fullWidth />
              <Field label="learningresourcetype" name="metadata.educational.learningresourcetype" component={renderChipInput} />
              <TextInput label="interactivitylevel" source="metadata.educational.interactivitylevel" fullWidth />
              <TextInput label="semanticdensity" source="metadata.educational.semanticdensity" fullWidth />
              <TextInput label="intendedenduserole" source="metadata.educational.intendedenduserole" fullWidth />
              <TextInput label="context" source="metadata.educational.context" fullWidth />
              <TextInput label="typicalagerange" source="metadata.educational.typicalagerange" fullWidth />
              <TextInput label="difficulty" source="metadata.educational.difficulty" fullWidth />
              <TextInput label="typicallearningtime" source="metadata.educational.typicallearningtime" fullWidth />
              <TextInput label="description" source="metadata.educational.description" fullWidth />
              <TextInput label="language" source="metadata.educational.language" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextInput label="installationremarks" source="metadata.technical.installationremarks" fullWidth />
              <TextInput label="otherplatformrequirements" source="metadata.technical.otherplatformrequirements" fullWidth />
              <TextInput label="duration" source="metadata.technical.duration" fullWidth />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography>rights</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <TextInput label="cost" source="metadata.rights.cost" fullWidth />
              <TextInput label="copyrightandotherrestrictions" source="metadata.rights.copyrightandotherrestrictions" fullWidth />
              <TextInput label="description" source="metadata.rights.description" fullWidth />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Typography>relation</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <TextInput label="kind" source="metadata.relation.kind" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Typography>resource</Typography>
              <div style={{ marginLeft: 20 }}>
                <Typography>identifier</Typography>
                <div style={{ marginLeft: 20 }}>
                  <TextInput label="catalog" source="metadata.relation.resource.identifier.catalog" fullWidth />
                  <TextInput label="entry" source="metadata.relation.resource.identifier.entry" fullWidth />
                </div>
                <TextInput label="description" source="metadata.relation.resource.description" fullWidth />
              </div>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8bh-content"
          id="panel8bh-header"
        >
          <Typography>annotation</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <TextInput label="entity" source="metadata.annotation.entity" fullWidth />
              <TextInput label="date" source="metadata.annotation.date" fullWidth />
              <TextInput label="description" source="metadata.annotation.description" fullWidth />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9bh-content"
          id="panel9bh-header"
        >
          <Typography>classification</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <TextInput label="purpose" source="metadata.classification.purpose" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Typography>taxonPath</Typography>
              <div style={{ marginLeft: 20 }}>
                <TextInput label="source" source="metadata.classification.taxonPath.source" fullWidth />
                <Typography>taxon</Typography>
                <div style={{ marginLeft: 20 }}>
                  <TextInput label="id" source="metadata.classification.taxonPath.taxon.id" fullWidth />
                  <TextInput label="entry" source="metadata.classification.taxonPath.taxon.entry" fullWidth />
                </div>
              </div>
              <TextInput label="description" source="metadata.classification.taxonPath.description" fullWidth />
              <TextInput label="keyword" source="metadata.classification.taxonPath.keyword" fullWidth />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === 'panel10'} onChange={handleChange('panel10')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel10bh-content"
          id="panel10bh-header"
        >
          <Typography>accessibility</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              <Typography>presentationmode</Typography>
              <div style={{ marginLeft: 20 }}>
                <TextInput label="auditory" source="metadata.accessibility.presentationmode.auditory" fullWidth />
                <TextInput label="textual" source="metadata.accessibility.presentationmode.textual" fullWidth />
                <TextInput label="visual" source="metadata.accessibility.presentationmode.visual" fullWidth />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography>interactionmode</Typography>
              <div style={{ marginLeft: 20 }}>
                <TextInput label="keyboard" source="metadata.accessibility.interactionmode.keyboard" fullWidth />
                <TextInput label="mouse" source="metadata.accessibility.interactionmode.mouse" fullWidth />
                <TextInput label="voicerecognition" source="metadata.accessibility.interactionmode.voicerecognition" fullWidth />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography>adaptationtype</Typography>
              <div style={{ marginLeft: 20 }}>
                <TextInput label="audiodescription" source="metadata.accessibility.adaptationtype.audiodescription" fullWidth />
                <TextInput label="hearingalternative" source="metadata.accessibility.adaptationtype.hearingalternative" fullWidth />
                <TextInput label="textualalternative" source="metadata.accessibility.adaptationtype.textualalternative" fullWidth />
                <TextInput label="signlanguage" source="metadata.accessibility.adaptationtype.signlanguage" fullWidth />
                <TextInput label="subtitles" source="metadata.accessibility.adaptationtype.subtitles" fullWidth />
              </div>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

const MetadataForm = (props) => (
  <FormWithRedirect
    {...props}
    render={formProps => (
      // here starts the custom form layout
      <ControlledExpansionPanels />
    )}
  />
);


export const LearningObjectEdit = (props) => (
  <Edit {...props}>
    <TabbedForm tabs={<TabbedFormTabs />}>
      <FormTab label="summary">
      </FormTab>
      <FormTab label="metadata">
        <MetadataForm />
      </FormTab>
    </TabbedForm>
  </Edit>
);