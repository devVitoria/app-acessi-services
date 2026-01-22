import { financeChatTable, spendingCategoriesTable, usersTable } from "../db/schema";
import { FinanceChatInterface, GetAllFinanceChatsInterface } from "../utils/interface";

export class FinancialService {
    private usersTable = usersTable;
  private fChat = financeChatTable;
  private sCategories = spendingCategoriesTable;

  async financeChat(data: FinanceChatInterface, db: any) {
    try {
     const user = await db.select().from(this.usersTable).where({
        cpf: data.cpf,
      });
      if (user.length === 0) {
        return new Response(
          JSON.stringify({
            message: "Usuário não encontrado.",
          }),
          { status: 400 },
        );
      }
      if (data.category) {
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

        return await db.insert(this.fChat).values({
          userId: user[0].userId,
          reason: data.reason,
          category: data.category,
          value: data.value,
        });
      }

      return await db.insert(this.fChat).values({
        userId: data.cpf,
        reason: data.reason,
        value: data.value,
      });
    } catch (e) {
      throw new Error(`Erro ao inserir chat financeiro ${e ?? ""}`);
    }
  }

  async getAllChats(data: GetAllFinanceChatsInterface, db: any) {
    try {
      const user = await db.select().from(this.usersTable).where({
        cpf: data.cpf,
      });

      if (user.length === 0) {
        return new Response(
          JSON.stringify({
            message: "Usuário não encontrado.",
          }),
          { status: 400 },
        );
      }
      return await db.select().from(this.fChat).where({
        userId: user[0].userId,
      });
    } catch (e) {
      throw new Error(`Erro ao buscar chats financeiros ${e ?? ""}`);
    }
  }
}