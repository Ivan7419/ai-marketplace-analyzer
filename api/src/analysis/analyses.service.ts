import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { MarketplaceAnalysis } from '../ai/marketplace-analysis.interface';
import { Prisma } from '@prisma/client';
import { CreateAnalysisDto } from './dto/create-analysis.dto';

@Injectable()
export class AnalysesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiService: AiService,
  ) {}

  async create(input: CreateAnalysisDto) {
    const analysis: MarketplaceAnalysis =
      await this.aiService.analyzeMarketplace(input);

    return this.prisma.analysis.create({
      data: {
        query: input.query,
        marketplace: input.marketplace,
        market: input.market,
        businessModel: input.businessModel,

        targets: input.targets
          ? (input.targets as Prisma.InputJsonValue)
          : undefined,

        result: analysis as unknown as Prisma.InputJsonValue,
      },
    });
  }

  async findAll() {
    return this.prisma.analysis.findMany({
      select: {
        id: true,
        query: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.analysis.findUniqueOrThrow({
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prisma.analysis.delete({
      where: { id },
    });
  }
}
