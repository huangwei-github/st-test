import { Component } from "@angular/core";
import { STColumn, STColumnBadge, STColumnTag } from "@delon/abc/st";

const BADGE: STColumnBadge = {
  1: { text: "成功", color: "success" },
  2: { text: "错误", color: "error" },
  3: { text: "进行中", color: "processing" },
  4: { text: "默认", color: "default" },
  5: { text: "警告", color: "warning" }
};
const TAG: STColumnTag = {
  1: { text: "成功", color: "green" },
  2: { text: "错误", color: "red" },
  3: { text: "进行中", color: "blue" },
  4: { text: "默认", color: "" },
  5: { text: "警告", color: "orange" }
};
const r = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

@Component({
  selector: "components-st-type",
  template: `
    <button nz-button (click)="reload()">Reload</button>
    <st
      #st
      [data]="users"
      [columns]="columns"
      [scroll]="{ x: '1300px' }"
      [expand]="expand"
    >
      <ng-template st-row="enumTpl" let-item let-index="index">
        <input
          nz-input
          *ngIf="item.edit"
          [ngModel]="item.age"
          (ngModelChange)="st.setRow(index, { age: $event })"
        />
        <div
          *ngIf="!item.edit"
          (click)="console.log('--'); st.setRow(index, { edit: !item.edit })"
        >
          {{ item.age }}
        </div>
      </ng-template>
      <ng-template #expand let-item let-index="index" let-column="column">
        <st [data]="users" [columns]="columns" showHeader="false"></st>
      </ng-template>
    </st>
  `
})
export class ComponentsStTypeComponent {
  users: any[] = [];
  columns: STColumn[] = [
    {
      title: "行号",
      type: "no",
      fixed: "left",
      width: 100,
      filter: {
        type: "keyword",
        fn: (filter, record) =>
          !filter.value || record.name.indexOf(filter.value) !== -1
      }
    },
    { title: "姓名", index: "name", fixed: "left", width: 100 },
    {
      title: "年龄",
      index: "age",
      render: "enumTpl"
    },
    { title: "tag", index: "tag", type: "tag", tag: TAG },
    { title: "badge", index: "badge", type: "badge", badge: BADGE },
    {
      title: "Enum",
      index: "enum",
      type: "enum",
      enum: { 1: "壹", 2: "贰", 3: "叁" }
    },
    { title: "yn", index: "yn", type: "yn" }
  ];

  reload(): void {
    this.users = Array(10)
      .fill({})
      .map((_, idx) => ({
        id: idx + 1,
        name: `name ${idx + 1}`,
        age: r(10, 50),
        tag: r(1, 5),
        badge: r(1, 5),
        enum: r(1, 3),
        yn: [true, false][r(1, 5) % 2],
        showExpand: true
      }));
  }

  constructor() {
    this.reload();
  }
}
