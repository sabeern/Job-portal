import React, { useEffect, useState, useRef } from 'react';
import cloneDeep from "lodash/cloneDeep";
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import "../../stylesheet/tableStyle.css";

function JobIssuesList({ data }) {
  const [allData, setAllData] = useState(data);
  const tableHead = {
    jobId: "Job Id",
    jobTitle: "JobTitle",
    user: "Posted User",
    date: "Posted Date",
    details: "View Details"
  };
  const countPerPage = 10;
  const [value, setValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [collection, setCollection] = useState(
    cloneDeep(allData.slice(0, countPerPage))
  );
  useEffect(() => {
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

  const searchData = useRef(
    throttle(val => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const data1 = cloneDeep(
        allData
          .filter(item => item.jobTitle.toLowerCase().indexOf(query) > -1)
          .slice(0, countPerPage)
      );
      setCollection(data1);
    }, 400)
  );

  const updatePage = p => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(allData.slice(from, to)));
  };

  const tableRows = rowData => {
    const { key, index } = rowData;
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((keyD, i) => {
      return <td key={i}>{key[keyD]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((key, index) => tableRows({ key, index }));
  };

  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index}>{title}</td>
    ));
  };
  return (
    <>
      <div class="search">
        <input
          placeholder="Search Job Title"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <table>
        <thead>
          <tr>{headRow()}</tr>
        </thead>
        <tbody className="trhover">{tableData()}</tbody>
      </table>
      <Pagination
        pageSize={countPerPage}
        onChange={updatePage}
        current={currentPage}
        total={allData.length}
      />
    </>
  )
}

export default JobIssuesList;