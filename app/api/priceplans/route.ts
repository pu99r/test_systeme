import { NextRequest, NextResponse } from "next/server";
import db from "./database";
import { promisify } from "util";

const runQuery = promisify(db.run.bind(db));

export async function GET(req: Request) {
  try {
    const items = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM items", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          const itemsWithBoolean = rows.map(row => ({
            ...row,
            active: row.active === 1
          }));
          resolve(itemsWithBoolean);
        }
      });
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { id, description } = await req.json();
    const updateQuery = `
      UPDATE items 
      SET description = ? 
      WHERE id = ?
    `;

    await runQuery(updateQuery, [description, id]);

    return NextResponse.json({ message: "Data updated successfully" });
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
}