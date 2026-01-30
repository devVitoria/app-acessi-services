import dayjs from "dayjs";
import { asc, eq } from "drizzle-orm";
import {
  financeChatTable,
  spendingCategoriesTable,
  usersTable,
} from "../db/schema";
import {
  FinanceChatInterface,
  GetAllFinanceChatsInterface,
} from "../utils/interface";

export class FinancialService {
  private usersTable = usersTable;
  private fChat = financeChatTable;
  private sCategories = spendingCategoriesTable;

  async financeChat(data: FinanceChatInterface, db: any) {
    try {
      const user = await db
        .select()
        .from(this.usersTable)
        .where(eq(this.usersTable.cpf, data.cpf));

      if (user.length === 0) {
        return new Response(
          JSON.stringify({
            message: "Usuário não encontrado.",
          }),
          { status: 400 },
        );
      }
      if (data.category && data.category !== 0) {
        const category = await db.select().from(this.sCategories).where({
          id: data.category,
        });

        if (category.length === 0) {
          return new Response(
            JSON.stringify({
              message:
                "Categoria não encontrada, verifique se a mesma está cadastrada.",
            }),
            { status: 400 },
          );
        }

        return await db.insert(financeChatTable).values({
          userId: user[0].id,
          reason: data.reason,
          category: data.category,
          value: data.value,
        });
      }

      return await db.insert(financeChatTable).values({
        userId: user[0].id,
        reason: data.reason,
        value: data.value,
      });
    } catch (e) {
      throw new Error(`Erro ao inserir chat financeiro ${e ?? ""}`);
    }
  }

  async getAllChats(data: GetAllFinanceChatsInterface, db: any) {
    try {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(this.usersTable.cpf, data.cpf));

      if (user.length === 0) {
        return new Response(
          JSON.stringify({
            message: "Usuário não encontrado.",
          }),
          { status: 400 },
        );
      }

      const result = await db
        .select()
        .from(financeChatTable)
        .where(eq(this.fChat.userId, user[0].id))
        .orderBy(asc(financeChatTable.created_at));

      const fixDates = result.map((v: any) => {
        const { created_at, updated_at, ...rest } = v;
        const created_day = dayjs(created_at).format("DD/MM/YYYY HH:MM");
        const updated_day = dayjs(updated_at).format("DD/MM/YYYY HH:MM");
        return {
          ...rest,
          created_at: created_day,
          updated_at: updated_day,
        };
      });
      return fixDates;
    } catch (e) {
      throw new Error(`Erro ao buscar chats financeiros ${e ?? ""}`);
    }
  }
}
