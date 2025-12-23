import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Post('sign-up')
    signUp(@Body() dto: any) { 
        return "You want to sign up?"
    }

    @Post('sign-in')
    signIn(@Body() dto: any) { 
        return "You want to sign in?"
    }
}
