import React, { useState } from 'react';
import { Button } from "strapi-helper-plugin";
import { saveAs } from "file-saver";
import { fetchEntries } from "../../utils/contentApis";
import { HFlex, ModelItem } from "./ui-components";
import JsonDataDisplay from "../../components/JsonDataDisplay";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const xl = require('excel4node');

const ExportModel = ({ model }) => {
  const [fetching, setFetching] = useState(false);
  const [content, setContent] = useState(null);
  const fetchModelData = () => {
    setFetching(true);
    fetchEntries(model.apiID, model.schema.kind).then((data) => {
      setContent(data);
    }).finally(() => {
      setFetching(false);
    });
  };

  const downloadXl = () => {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Export');

    const headingColumnNames = Object.keys(content[0]);

    let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
      ws.cell(1, headingColumnIndex++)
        .string(heading)
    });

    let rowIndex = 2;
    data.forEach(record => {
      let columnIndex = 1;
      Object.keys(record).forEach(columnName => {
        if (typeof record[columnName] === 'string' && record[columnName] !== null) {
          ws.cell(rowIndex, columnIndex++)
            .string(record[columnName])
        } else if (typeof record[columnName] === 'object' && record[columnName] !== null) {
          if ("id" in record[columnName]) {
            console.log(columnName)
            console.log(record[columnName].id)
            ws.cell(rowIndex, columnIndex++)
              .number(record[columnName].id)
          }
        } else if (typeof record[columnName] === 'number' && record[columnName] !== null) {
          ws.cell(rowIndex, columnIndex++)
            .number(record[columnName])
        } else {
          ws.cell(rowIndex, columnIndex++)
            .string(record[columnName])
        }


      });
      rowIndex++;
    });
    wb.write(`${model.apiID}-${current.getTime()}.xlsx`);

  };

  const downloadJson = () => {
    const current = new Date();
    const file = new File([JSON.stringify(content)],
      `${model.apiID}-${current.getTime()}.json`,
      { type: "application/json;charset=utf-8" });
    saveAs(file);
  };
  return (<ModelItem>
    <HFlex>
      <span className='title'>{model.schema.name}</span>
      <div>
        <Button disabled={fetching}
          loader={fetching}
          onClick={fetchModelData}
          secondaryHotline>{fetching ? "Fetching" : "Fetch"}</Button>
        <Button disabled={!content}
          onClick={downloadXl}
          kind={content ? 'secondaryHotline' : 'secondary'}
        >Export</Button>
      </div>
    </HFlex>
    {
      content && (<JsonDataDisplay data={content} />)
    }
  </ModelItem>)
};

export default ExportModel;
