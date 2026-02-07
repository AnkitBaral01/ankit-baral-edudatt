import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Res, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenGuard } from 'src/common/refreshToken.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('login')
	async login(@Body() createAuthDto: CreateAuthDto, @Res() res) {
		try {

			const loginData = await this.authService.login(createAuthDto);

			res.status(HttpStatus.OK).json({
				success: true,
				message: "User logged in successfully",
				data: {
					user: loginData.user,
					accessToken: loginData.tokens.token,
					refreshToken: loginData.tokens.refreshToken,
				}
			});
			
		} catch (e) {
			console.log(e);
			if (e instanceof BadRequestException) { 
				res.status(HttpStatus.BAD_REQUEST).json({
					success: false,
					message: e.message
				})

			}

			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: "Internal server error"
			});
		}

	}

	@UseGuards(RefreshTokenGuard)
	@Get('refresh-token')
	async refreshToken(@Res() res, @Req() req) {
		try {
			
			const user = req.user;

			const tokens = await this.authService.refreshToken(user);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: "Token refreshed",
				data: {
					user: user,
                    accessToken: tokens.token,
                    refreshToken: tokens.refreshToken,
				}
			})
		} catch (e) {
			if (e instanceof BadRequestException) { 
				res.status(HttpStatus.BAD_REQUEST).json({
					success: false,
					message: e.message
				})
			}

			res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: "Internal server error"
			});
			
		}
	}

}
