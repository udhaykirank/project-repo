import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './TaskDraft.css'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown ,faClock,faRightLeft,faAngleDown  } from '@fortawesome/free-solid-svg-icons';
import PDFViewer from './PDFViewer';
import { connect } from 'react-redux';
import { SEND_MOCK_DATA_TO_TASK_DRAFT } from './actions';


 class TaskDraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId: null,
      activeButtonIndexTopBarRightSection: 0,
      showInvoiceDetailsDropdown: false,
      showVendorDetailsDropdown: false,
      formData: {
        documentType: '',
        invoiceNumber: '',
        invoiceDate: '',
        invoiceReceiptDate: '',
        baselineDate: ''
      }
    };
  }

 
  componentDidMount() {
    const { mockData, match } = this.props;
   
    const { taskId } = match.params;
    console.log('Mock Data:', mockData);
    console.log('Task ID:', taskId);
    this.setState({ taskId });
    
  }


  handleInvoiceDetailsClick = () => {
    this.setState({ showInvoiceDetailsDropdown: !this.state.showInvoiceDetailsDropdown });
  }

  handleVendorDetailsClick = () => {
    this.setState({ showVendorDetailsDropdown: !this.state.showVendorDetailsDropdown });
  }

  handleButtonClickTopBarRightSection = (index) => {
    this.setState({ activeButtonIndexTopBarRightSection: index });
  };

  handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [fieldName]: value
      }
    }));
  }

  render() {

    const { taskId } = this.state;

    const { vendorCode, vendorName } = this.props;
    const { selectedTaskId } = this.props;
    const { selectedTaskData } = this.props;


    const buttonsData = [
        { label: 'Invoice Details' },
        { label: 'Vendor Evaluation' },
        { label: 'Checklist' },
        { label: 'Statuatory Compliance'},
        { label: 'PO Details'},
        { label: 'Action History'}
      ];
  
    const { formData } = this.state;

    return (
      <div className="container">
        


        <div className="top-bar">
        <div className='Task-number-draft-heading'>Task {taskId} Draft</div>
  <div className="top-bar-buttons">


    <div className='top-bar-button fa-right-left-icon-in-top-bar'>
    <FontAwesomeIcon  icon={faRightLeft} />
    </div>

    <button className="top-bar-button"> Save to Draft</button>
    <button className="top-bar-button submit-button-top-bar"> Submit</button>
  </div>
</div>


       
        <div className="center-content">
         

          <div className="left-section">
            <PDFViewer/>
          </div>
          

          <div className="right-section">



            <div className="top-bar-right-section">
              
                  {buttonsData.map((button, index) => (
                    <div
                      key={index}
                      className={`custom-button-with-numbercount ${this.state.activeButtonIndexTopBarRightSection === index ? 'active-button' : ''}`}
                      onClick={() => this.handleButtonClickTopBarRightSection(index)}
                    >
                      {button.label} 
                    </div>
                  ))}

            </div>


            <div className="invoice-details-dropdown-bar-whole-container">
             


              <div className="invoice-details-dropdown-bar-container">
              <div className="invoice-details-dropdown-bar" onClick={this.handleInvoiceDetailsClick}>
              <FontAwesomeIcon className='fa-Chevron-Down-icon' icon={faChevronDown} /> INVOICE DETAILS
                </div>


              {this.state.showInvoiceDetailsDropdown && (
  <div className="dropdown-content">

    <div className='dropdown-content-form-rows'>
      <label htmlFor="documentType">Document Type <span className="mandatory-field">*</span> :</label>
      <div className='dropdown-content-form-inputs'>
      <select  value={formData.documentType} onChange={this.handleDocumentTypeChange} required>
        <option value="TAX INVOICE">TAX INVOICE</option>
       
      </select>
    </div>
    </div>

    <div className='dropdown-content-form-rows'>
      <label htmlFor="invoiceNumber">Invoice Number <span className="mandatory-field">*</span> :</label>
      <div className='dropdown-content-form-inputs'>
      <input type="text" value={formData.invoiceNumber} onChange={this.handleInvoiceNumberChange} required/>
    </div>
    </div>
    <div className='dropdown-content-form-rows'>
      <label htmlFor="invoiceDate">Invoice Date <span className="mandatory-field">*</span> :</label>
      <div className='dropdown-content-form-inputs'>
      <input type="date" value={formData.invoiceDate} onChange={(e) => this.handleInputChange(e, 'invoiceDate')} placeholder="Select Date" required/>
    </div>
    </div>
    <div className='dropdown-content-form-rows'>
      <label htmlFor="invoiceReceiptDate">Invoice Receipt Date <span className="mandatory-field">*</span> :</label>
      <div className='dropdown-content-form-inputs'>
      <input type="date" value={formData.invoiceReceiptDate} onChange={(e) => this.handleInputChange(e, 'invoiceReceiptDate')} placeholder="Select Date" required/>
    </div>
    </div>
    <div className='dropdown-content-form-rows'>
      <label htmlFor="baselineDate">Baseline Date <span className="mandatory-field">*</span> :</label>
      <div className='dropdown-content-form-inputs'>
      <input  type="date" value={formData.baselineDate} onChange={(e) => this.handleInputChange(e, 'baselineDate')} placeholder="Select Date" required/>
    </div>
    </div>
    <div className='dropdown-content-form-rows'>
      <label htmlFor="formSubmissionDate">Form Submission Date <span className="mandatory-field">*</span> :</label>
      <div className='dropdown-content-form-inputs'>
      <span  >22-02-2024</span> 
    </div>
    </div>
    <div className='dropdown-content-form-rows'>
      <label htmlFor="invoiceInitiationDuration">Invoice Initiation Duration (In Days):</label>
      <div className='dropdown-content-form-inputs'>
      <span  ></span> 
      </div>
    </div>
    
    <div className='dropdown-content-form-rows'>
      <label htmlFor="expeditedPaymentRequired">Expedited Payment Required <span className="mandatory-field">*</span> :</label>
      <div className='dropdown-content-form-inputs'>
      <label  htmlFor="yes">
        <input   type="radio" id="yes" name="expeditedPayment" value="yes" />
        Yes
      </label>
      <label htmlFor="no">
        <input type="radio" id="no" name="expeditedPayment" value="no" />
        No
      </label>
      </div>
    </div>


  </div>

  
)}

              </div>



              <div className="vendor-details-dropdown-bar-container">
              <div className="vendor-details-dropdown-bar" onClick={this.handleVendorDetailsClick}>
              <FontAwesomeIcon className='fa-Chevron-Down-icon' icon={faChevronDown} />   VENDOR DETAILS AS PER ORDER
                </div>


              {this.state.showVendorDetailsDropdown && (
  <div className="dropdown-content">
   
     
    
   <div className='dropdown-content-form-rows'>
  <label htmlFor="">Vendor Code <span className="mandatory-field">*</span> :</label>
  <span className='dropdown-content-form-inputs'>{vendorCode}</span> 
</div>
<div className='dropdown-content-form-rows'>
  <label htmlFor="">Vendor Name <span className="mandatory-field">*</span> :</label>
  <span className='dropdown-content-form-inputs'>{vendorName}</span> 
</div>

    <div className='dropdown-content-form-rows'>
      <label htmlFor="">Vendor GST:</label>
      <span className='dropdown-content-form-inputs' ></span> 
    </div>
   


  </div>

  
)}

              </div>






            </div>
          </div>
        </div>

        <div className="bottom-bar">
  <div className='bottom-bar-button-container'>
  <button className="bottom-bar-button">Currency: <span className='green-color-text-bottom-bar'>INR</span></button>
  <button className="bottom-bar-button">Inv Basic Amt: <span className='green-color-text-bottom-bar'>NA</span></button>
  <button className="bottom-bar-button">Basic Tax Amt: <span className='green-color-text-bottom-bar'>NA</span></button>
  <button className="bottom-bar-button">Inv Total Amt: <span className='green-color-text-bottom-bar'>NA</span></button>
  <button className="bottom-bar-button">SRN Amt: <span className='green-color-text-bottom-bar'>NA</span></button>
  <button className="bottom-bar-button">Total Amt Diff: <span className='green-color-text-bottom-bar'>NA</span></button>
  <button className="bottom-bar-button">Total Qty Diff: <span className='green-color-text-bottom-bar'>NA</span></button>
  <button className="bottom-bar-button">Net Payable Amt: <span className='green-color-text-bottom-bar'>NA</span></button>
  </div>


 
  <div className="select-action-button-container">
    <button className="select-action-button">
      Select Action <FontAwesomeIcon className='fa-angle-down-in-select-action-button' icon={faAngleDown} />
    </button>
  </div>
</div>


        
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { mockData } = state;
  const { match } = ownProps;
  const { taskId } = match.params;

 
  const matchingData = mockData.find(item => item.taskId === taskId);

 
  const vendorCode = matchingData ? matchingData.vendorCode : '';
  const vendorName = matchingData ? matchingData.vendorName : '';

  return {
    vendorCode,
    vendorName
  };
};


const mapDispatchToProps = (dispatch) => ({
  sendMockDataToTaskDraft: (mockData) => dispatch({ type: SEND_MOCK_DATA_TO_TASK_DRAFT, mockData })
});


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TaskDraft));
