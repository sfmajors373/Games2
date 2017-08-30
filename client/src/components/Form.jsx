import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form/immutable';

class Form extends PureComponent {
  render () {
    return (
      <div className="row scrollable">
        <div className="col-md-offset-2 col-md-8">
          <div className="text-left">
            <Link to="/games" className="btn btn-info">Back</Link>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h2 className="panel-title text-center">
                Add a Game!
              </h2>
            </div>
            <div className="panel-body">
              <form name="product-form" action="" onSubmit={() => this.props.submit()} noValidate>
                <div className="form-group text-left">
                  <label htmlFor="caption">Name</label>
                  <Field
                    name="description"
                    component="textarea"
                    className="form-control"
                    placeholder="Enter the description"
                    rows="5"
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="price">Year</label>
                  <Field
                    name="year"
                    component="input"
                    type="number"
                    className="form-control"
                    placeholder="Enter the year"
                  />
                </div>
              <div className="form-group text-left">
                <label htmlFor="picture">Picture</label>
                  <div className="text-center dropup">
                    <button id="button-upload" type="button" className="btn btn-danger" onClick={() => this.props.uploadPicture()}>
                      Upload <span className="caret" />
                    </button>
                  </div>
                </div>
                <div className="form-group text-center">
                  <img id="picture" className="img-responsive img-upload" />
                </div>
                <button type="submit" className="btn btn-submit btn-block">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

// form is named game so it can be accessed like form.game
export default reduxForm({ form: 'game' })(Form);
