import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AnalysesModule } from './analysis/analyses.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [PrismaModule, AnalysesModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
