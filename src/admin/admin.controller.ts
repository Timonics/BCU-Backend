import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { GetUser } from "src/common/decorators/user.decorator";

@Controller("admin")
export class AdminController {
  constructor() {}

  @Get("me")
  @ApiOperation({ summary: "Get complete user profile" })
  @ApiBearerAuth("access-token")
  @ApiResponse({
    status: 200,
    description: "Returns the authenticated user profile",
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async myProfile(@GetUser() profile: any) {
    return profile;
  }
}
