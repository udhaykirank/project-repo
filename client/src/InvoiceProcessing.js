import React, { Component, Redirect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './InvoiceProcessing.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSearch, faTrash, faAngleDown, faArrowLeft, faTableCells, faChartPie, faMagnifyingGlass, faImage, faBars, faUser, faUsers, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import mockData from './mockData';
import Home from './Home';
import NsymbolImage from './Nsymbol.png'; 
import { connect } from 'react-redux';
import { SEND_MOCK_DATA_TO_TASK_DRAFT, sendMockDataToTaskDraft } from './actions';




class InvoiceProcessing extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: mockData,
      activeButtonIndexTask: 0, 
      activeButtonIndexSecond: 0, 
      activePathIndex: 1,
      sortColumn: null,
      sortOrder: 'asc', 
      searchQuery: '',
      filteredData: [],
      activeSearchColumn: '', 
      redirectToTaskDraft: null
    };


     // Bind the handleSearch method to the component instance
  this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    // Dispatch action to send mockData to TaskDraft
    this.props.sendMockDataToTaskDraft(mockData);
}

  

  handleButtonClickTask = (index) => {
    this.setState({ activeButtonIndexTask: index });
  };

  handlePathItemClick = (index) => {
    this.setState({ activePathIndex: index });
  };


  handleButtonClickSecond = (index) => {
    this.setState({ activeButtonIndexSecond: index });
  };

  handleDelete = (taskId) => {
    // Filter out the row with the taskId to be deleted
    const updatedData = this.state.data.filter((row) => row.taskId !== taskId);
    
    // Update the state with the new data without the deleted row
    this.setState({
      data: updatedData,
      filteredData: updatedData.filter((row) => {
        // If there is a search query, filter the filteredData as well
        if (this.state.searchQuery !== '') {
          for (let key in row) {
            const columnValue = row[key];
            if (columnValue && columnValue.toString().toLowerCase().includes(this.state.searchQuery)) {
              return true; 
            }
          }
          return false; 
        } else {
          return true; 
        }
      }),
    });
  };
  

  handleSort = (columnName) => {
    console.log('Sorting column:', columnName);
    const { data, sortColumn, sortOrder } = this.state;
    let newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  
    let sortedData = [...data].sort((a, b) => {
      let valueA = a[columnName];
      let valueB = b[columnName];
  
      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return newSortOrder === 'asc' ? 1 : -1;
      if (valueB == null) return newSortOrder === 'asc' ? -1 : 1;
  
     
      valueA = valueA.toString().toLowerCase();
      valueB = valueB.toString().toLowerCase();
  
      
      if (valueA < valueB) return newSortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return newSortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  
    if (sortColumn === columnName) {
      sortedData.reverse(); 
    }
  
    this.setState({
      data: sortedData,
      sortColumn: columnName,
      sortOrder: newSortOrder,
    });
  };

  
  handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const { data } = this.state;
  
    console.log("Search Query:", searchQuery);
  
    
    let filteredData = data.filter((row) => {
      for (let key in row) {
        const columnValue = row[key];
        if (columnValue && columnValue.toString().toLowerCase().includes(searchQuery)) {
          return true; 
        }
      }
      return false; 
    });
  
    console.log("Filtered Data:", filteredData);
  
    this.setState({ searchQuery, filteredData }, () => {
      console.log("State after search:", this.state); 
    });
  };
  
  

  renderTableHeaders = () => {
    const headers = [
      'Task ID', 'PO Number', 'Plant Name', 'Company Name', 'Received Date',
      'Vendor Code', 'Vendor Name', 'Invoice Number', 'Invoice Date', 'Invoice Amount'
    ];

    const { sortColumn, sortOrder } = this.state;
    const { searchQuery, activeSearchColumn } = this.state;

    return headers.map((header, index) => (
      <th key={index} onClick={() => this.handleSort(header)}>
        <div>
          <div className="header-content">
            {header.split(' ').map((part, i) => (
              <span key={i}>
                {part}
                {i !== header.split(' ').length - 1 && <br />} 
              </span>
            ))}
          </div>
          <div className="icon-container">
          <span className={`sort-icon ${sortColumn === header ? sortOrder : ''}`}>
            <FontAwesomeIcon icon={faSort} />
          </span> 
          <span 
            className={`search-icon ${activeSearchColumn === header ? 'active' : ''}`} 
            onClick={(e) => { e.stopPropagation(); this.setState({ activeSearchColumn: header }); }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
        </div>
      </th>
    ));
  };

  render() {

    console.log("Data in mockData:", mockData);

    const { filteredData, data, searchQuery, activeSearchColumn } = this.state; 
    const displayData = filteredData.length > 0 ? filteredData : data; 

    const { redirectToTaskDraft } = this.state;

    
    if (redirectToTaskDraft) {
      return <Redirect to={`/taskdraft/${redirectToTaskDraft}`} />;
    }
  

    const buttonsData = [
      { label: 'Draft Tasks', count: 1 },
      { label: 'InProgress Tasks', count: 0 },
      { label: 'Forwarded Tasks', count: 0 },
      { label: 'Completed Tasks', count: 0 },
      { label: 'SP Invoices', count: 0 }
    ];

    return (
      <div className="invoice-processing">
        <div className="menu-bar">
          <div className='n-symbol-icon-image'>
            <img src={NsymbolImage} alt="Nsymbol" height={40} width={40} />
          </div>
          <div className="menu-icons">
            <FontAwesomeIcon icon={faTableCells} />
            <FontAwesomeIcon icon={faChartPie} />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <FontAwesomeIcon icon={faImage} />
            <FontAwesomeIcon icon={faBars} />
            <FontAwesomeIcon icon={faBars} />
            <FontAwesomeIcon icon={faImage} />
            <FontAwesomeIcon icon={faUser} />
            <FontAwesomeIcon icon={faUsers} />
            <FontAwesomeIcon icon={faUser} />
            <FontAwesomeIcon icon={faUser} />
            <FontAwesomeIcon icon={faCircleQuestion} />
          </div>
        </div>
        <div className='right-side-page-container'>
          <div className="horizontal-bar-0">
            <div className="back-arrow-container">
              <FontAwesomeIcon className='fa-arrow-left-icon' icon={faArrowLeft} />
              <span>Invoice Processing</span>
            </div>
            <div className="admin-info-container">
              <div className="blue-circle">NA</div>
              <span>NS2P ADMIN</span>
            </div>
          </div>
          <div className="horizontal-bar-1">
            <div className="page-path">
              <span
                className={`path-item ${this.state.activePathIndex === 0 ? 'active-path-item' : ''}`}
                onClick={() => this.handlePathItemClick(0)}
              >
                Home
              </span>
              <span className="separator">/</span>
              <span
                className={`path-item ${this.state.activePathIndex === 1 ? 'active-path-item' : ''}`}
                onClick={() => this.handlePathItemClick(1)}
              >
                Task
              </span>
            </div>
          </div>
          {this.state.activePathIndex === 0 ? (
            <Home />
          ) : (
              <div className='main-content'>
                <div className='task-buttons'>
                  {['My Tasks', 'Group Tasks'].map((buttonLabel, index) => (
                    <div
                      key={index}
                      className={`custom-button ${this.state.activeButtonIndexTask === index ? 'active-task-buttons' : ''}`}
                      onClick={() => this.handleButtonClickTask(index)}
                    >
                      {buttonLabel}
                    </div>
                  ))}
                </div>

                <div className='second-task-buttons'>
                  {buttonsData.map((button, index) => (
                    <div
                      key={index}
                      className={`custom-button-with-numbercount ${this.state.activeButtonIndexSecond === index ? 'active-button' : ''}`}
                      onClick={() => this.handleButtonClickSecond(index)}
                    >
                      {button.label} <span className='badge'>{button.count}</span>
                    </div>
                  ))}
                </div>

                <div className='table-container-invoice-processing'>
                 

                <div className='download-button-container'>
  {activeSearchColumn && (
    <div className="search-input-container">
   <input
  type="search"
  className="search-input"
  placeholder="Search..."
  value={searchQuery}
  onChange={this.handleSearch}
  onClick={(e) => e.stopPropagation()}
  />



    </div>
  )}
  <button className="download-button">
    Download <FontAwesomeIcon className='fa-angle-down' icon={faAngleDown} />
  </button>
</div>

                  
                  <table>
                    <thead style={{ backgroundColor: '#fafafa' }}>
                      <tr>
                        {this.renderTableHeaders()}
                        <th className='action-heading-column'>
                          <div className='action-column-container'>
                          <div className='action-column'>Actions</div>
                          </div>
                        </th>
                      </tr>
                    </thead>
                  
                    <tbody>
  {filteredData.length === 0 && searchQuery !== '' ? (
    <tr className='invoice-processing-data-row'>
      <td className='invoice-processing-data-columns' colSpan="11" style={{ textAlign: 'center', paddingTop: '10px' }}>
        No matching records found.
      </td>
    </tr>
  ) : (
    displayData.map((row, index) => (
      <tr className='invoice-processing-data-row' key={index}>
        {Object.keys(row).map((key, columnIndex) => (
           <td className='invoice-processing-data-columns' key={columnIndex}>
           {columnIndex === 0 ? ( 
             <Link className='remove-text-decoration-for-underline' to={`/taskdraft/${row.taskId}`}>{row[key]}</Link>
           ) : (
             row[key] 
           )}
         </td>
        ))}
        <td className='invoice-processing-icon-cell'>
          <div className='shadow-column'>
          <FontAwesomeIcon
  className='delete-icon'
  icon={faTrash}
  onClick={() => this.handleDelete(row.taskId)}
/>

          </div>
        </td>
      </tr>
    ))
  )}
</tbody>

                  </table>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMockDataToTaskDraft: () => dispatch(sendMockDataToTaskDraft(mockData))
  };
};
const mapStateToProps = (state) => ({
  mockData: state.mockData
});



export default connect(mapStateToProps, mapDispatchToProps)(InvoiceProcessing);


