import { NextRequest, NextResponse } from "next/server";
import db from "./database";
import { promisify } from "util";
const run = (query: string, params: any, callback: Function) => {
  db.run(query, params, callback);
};
const runQuery = promisify(run);
interface Item {
  id: number;
  name: string;
  active: boolean;
}
export async function GET(req: Request) {
  try {
    const items = await new Promise<Item[]>((resolve, reject) => {
      db.all("SELECT * FROM items", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const itemsWithBoolean = rows.map((row: any) => ({
            ...(row as Item),
            active: row.active === 1,
          }));
          resolve(itemsWithBoolean);
        }
      });
    });

    return NextResponse.json(items);
  } catch {
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  try {
    const { id, title } = await req.json();
    const updateQuery = `
      UPDATE items 
      SET title = ? 
      WHERE id = ?
    `;

    await runQuery(updateQuery, { 1: title, 2: id });

    return NextResponse.json({ message: "Data updated successfully" });
  } catch (error) {
    return NextResponse.error();
  }
}
