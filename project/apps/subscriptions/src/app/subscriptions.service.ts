import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSubscriptionDto } from '@project/subscriptions-lib';
import { SubscriptionsRepository } from './subscriptions.repository';
import { SubscriptionsEntity } from './subscriptions.entity';
import { ERROR_MESSAGES } from '@project/core';

@Injectable()
export class SubscriptionsService {
  constructor(private subscriptionsRepository: SubscriptionsRepository) {}

  public async find(userId: string): Promise<SubscriptionsEntity[]> {
    const userDefaultSubscription = new SubscriptionsEntity({
      authorId: userId,
      createdBy: userId,
    });

    const subscriptions = await this.subscriptionsRepository.findByUserId(
      userId
    );

    return [userDefaultSubscription, ...subscriptions];
  }

  public async create(
    userId: string,
    dto: CreateSubscriptionDto
  ): Promise<SubscriptionsEntity> {
    const existingSubscription =
      await this.subscriptionsRepository.findByAuthorId(userId, dto.authorId);
    if (!existingSubscription) {
      const subEntity = new SubscriptionsEntity({ ...dto, createdBy: userId });
      await this.subscriptionsRepository.save(subEntity);
      return subEntity;
    }
    throw new ConflictException(ERROR_MESSAGES.SUBSCRIPTION_EXISTS);
  }

  public async delete(userId: string, authorId: string) {
    const subscription = await this.subscriptionsRepository.findByAuthorId(
      userId,
      authorId
    );
    if (subscription) {
      return this.subscriptionsRepository.deleteById(subscription.id);
    }
    throw new NotFoundException(ERROR_MESSAGES.SUBSCRIPTION_NOT_FOUND);
  }
}
