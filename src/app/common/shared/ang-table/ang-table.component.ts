import { Component, OnInit, Output, ViewChild, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../common.service';

@Component({
    selector: 'app-table',
    templateUrl: './ang-table.component.html',
    styleUrls: ['./ang-table.component.css']
})
export class AngTableComponent implements AfterViewInit {


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataSource = new MatTableDataSource<any>();
    displayedColumns: any;
    paginatorProps: any;
    title: string;
    primaryKey: string;

    @Output() applyFilter = new EventEmitter();
    @Output() deleteRowData = new EventEmitter();
    @Output() addEditRowData = new EventEmitter();


    @Input() set tableObject(value) {
        if (value) {
            this.title = value.title
            this.displayedColumns = value.displayedColumns
            this.dataSource = new MatTableDataSource(value.tableData);
            this.paginatorProps = value.pageInfo;
            this.primaryKey = value.primaryKey
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.filter = this.commonService.filterValue.trim().toLocaleLowerCase();
        }
    }

    @Input() set addOrEditRow(value) {
        if (value) {
            if (value.type === 'add') {
                const val = this.dataSource.data;
                val.push(value.row)
                this.dataSource = new MatTableDataSource(val);
            } else if (value.type === 'edit') {
                for (let i = 0; i < this.dataSource.data.length; i++) {
                    if (this.dataSource.data[i][this.primaryKey] == value.row[this.primaryKey]) {
                        this.dataSource.data[i] = value.row;
                        break;
                    }
                };
                this.dataSource = new MatTableDataSource(this.dataSource.data);
            }
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    }


    onDelete(ele) {
        this.deleteRowData.emit(ele);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    constructor(public commonService: CommonService) { }

    onAdd() {
        this.addEditRowData.emit({ type: 'add', row: null });
    }

    onEdit(ele) {
        this.addEditRowData.emit({ type: 'edit', row: ele });
    }

    newApplyFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
        this.commonService.filterValue = value.trim().toLocaleLowerCase();
    }

    getServerData(event) {
        console.log(event);
        this.commonService.pageIndex = event.pageIndex;
    }

}
