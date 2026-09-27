"use client";

import styles from "./core-ui.module.css";

type Row = Record<string, unknown>;

function scalar(value: unknown) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Sim" : "Não";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function rowsFrom(data: unknown): Row[] {
  if (Array.isArray(data)) return data.filter((item): item is Row => Boolean(item) && typeof item === "object");
  if (data && typeof data === "object") {
    const object = data as Row;
    for (const key of ["items", "data", "students", "workouts", "assessments", "charges", "accounts", "slots", "results"]) {
      const candidate = object[key];
      if (Array.isArray(candidate)) return rowsFrom(candidate);
    }
    return [object];
  }
  return [];
}

export function DataTable({ data, preferred = [], empty = "Nenhum registro encontrado." }: { data: unknown; preferred?: string[]; empty?: string }) {
  const rows = rowsFrom(data);
  if (!rows.length) return <div className={styles.empty}>{empty}</div>;
  const keys = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const columns = [...preferred.filter((key) => keys.includes(key)), ...keys.filter((key) => !preferred.includes(key))].slice(0, 8);
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={String(row.id ?? index)}>{columns.map((column) => <td key={column}>{scalar(row[column])}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function countRows(data: unknown) {
  return rowsFrom(data).length;
}
