import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSocialAccountDto } from './dtos/createSocialAccount.dto';
import { GetSocialAccountsDto } from './dtos/getParamsSocialAccounts.dto';
import { SocialAccountsService } from './providers/social-accounts.service';

@Controller('social-accounts')
export class SocialAccountsController {
  constructor(
    /**inject social accounts service */
    private readonly socialAccountsService: SocialAccountsService,
  ) {}
  @Post()
  public createSocialAccount(
    @Body() createSocialAccountDto: CreateSocialAccountDto,
  ) {
    console.log(createSocialAccountDto);
    return 'social account created';
  }

  @Get()
  public findAll(@Param() getSocialAccountsDto: GetSocialAccountsDto) {
    console.log(getSocialAccountsDto);
    return this.socialAccountsService.findAll(getSocialAccountsDto.userId);
  }
}
