import React, {
  Component,
} from 'react';
import { Field, reduxForm } from 'redux-form';

const genreList = [
  {
    id: 'action',
    value: 'Action',
  },
  {
    id: 'adventure',
    value: 'Adventure',
  },
  {
    id: 'comedy',
    value: 'Comedy',
  },
  {
    id: 'sci-fi',
    value: 'Sci-Fi',
  },
];

const languageList = [
  {
    id: '',
    value: 'Select',
  },
  {
    id: 'english',
    value: 'Englis',
  },
  {
    id: 'hindi',
    value: 'Hindi',
  },
  {
    id: 'marathi',
    value: 'Marathi',
  },
  {
    id: 'urdu',
    value: 'Urdu',
  },
];

class AddMovie extends Component {
  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div className="msg error-msg">{error}</div>
      );
    }
  }

  onSubmit = (formValues) => {
    console.log('Form is valid / formValues = ' , formValues);
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <div className="form-element">
        <label>{label}: </label>
        <input className="form-object" {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  }

  renderSelect = (props) => {
    const { input, label, meta, data, multiple } = props;
    const classList = ['form-object'];
    const params = {};
    if (multiple) {
      params['multiple'] = true;
      params['value'] = input.value || [];
      classList.push('multiple');
    }
    return (
      <div className="form-element">
        <label>{label}: </label>
        <select className={classList.join(' ')} {...input} {...params}>
          {
            data.map(item => {
              return (
                <option key={item.id} value={item.id}>{item.value}</option>
              );
            })
          }
        </select>
        {this.renderError(meta)}
      </div>
    );
  }

  render() {
    return (
      <div className="container add-movie-wrap">
        <h1>Add Movie</h1>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="title" component={this.renderInput} label="Title" />
          <Field name="year" component={this.renderInput} label="Year" />
          <Field name="genre" component={this.renderSelect} label="Genre" data={genreList} multiple={true} />
          <Field name="language" component={this.renderSelect} label="Language" data={languageList} />
          <Field name="plot" component={this.renderInput} label="Plot" />
          <Field name="websiteUrl" component={this.renderInput} label="Website URL" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const currentYear = new Date().getFullYear();

const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title';
  }
  if ((formValues.title + '').length > 50) {
    errors.title = 'Title should be of max 50 characers';
  }
  if (!formValues.year) {
    errors.year = 'You must enter a year';
  }
  if (isNaN(+formValues.year)) {
    errors.year = 'You must enter a numeric value';
  }
  if (+formValues.year < 1980) {
    errors.year = 'You must enter a year above 1980';
  }
  if (+formValues.year > currentYear) {
    errors.year = 'Year should not be in future';
  }
  if (
    !formValues.genre ||
    !formValues.genre.length
  ) {
    errors.genre = 'You must select option(s)';
  }
  if (formValues.genre && formValues.genre.length > 3) {
    errors.genre = 'You must select a maximum of 3 options';
  }
  if (!formValues.language) {
    errors.language = 'You must select a language';
  }
  if (isNaN(+formValues.plot)) {
    errors.plot = 'You must enter a numeric value';
  }
  if (+formValues.plot < 100) {
    errors.plot = 'You must enter a plot above 100';
  }
  if (+formValues.plot > 500) {
    errors.plot = 'You must enter a plot below 500';
  }
  if (!formValues.websiteUrl) {
    errors.websiteUrl = 'You must enter a Website URL';
  }
  if (!urlRegex.test(formValues.websiteUrl)) {
    errors.websiteUrl = 'You must enter a valid URL';
  }
  return errors;
}

export default reduxForm({
  form: 'addMovieForm',
  validate,
})(AddMovie);