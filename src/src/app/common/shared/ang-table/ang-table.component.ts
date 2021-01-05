import { Component, OnInit, Output, ViewChild, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
    title: string;
    primaryKey: string;

    @Output() openDialog = new EventEmitter();
    @Output() applyFilter = new EventEmitter();
    @Output() deleteRowData = new EventEmitter();
    @Output() editRowData = new EventEmitter();


    @Input() set tableObject(value) {
        if (value) {
            this.title = value.title
            this.displayedColumns = value.displayedColumns
            this.dataSource = new MatTableDataSource(value.tableData);
            this.primaryKey = value.primaryKey
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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
        this.dataSource = new MatTableDataSource(this.dataSource.data.filter(res => res[this.primaryKey] != ele[this.primaryKey]));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    constructor() {  }

    newOpenDialog() {
        this.openDialog.emit();
    }

    onEdit(ele) {
        this.editRowData.emit(ele);
    }

    newApplyFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
    }


}
