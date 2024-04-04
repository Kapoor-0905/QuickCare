import 'package:http/http.dart' as http;
import 'package:quickcare_user/controllers/sharedPreferenceController.dart';

class UserController {
  static String uri = 'https://bored-lime-codfish.cyclic.app';

  Future getUserDetails({required String userId}) async {
    try {
      String? token = await SF.getJwtToken();
      http.Response response =
          await http.get(Uri.parse('$uri/users/$userId'), headers: {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json; charset=UTF-8',
      });
      return response.body;
    } catch (e) {
      throw Exception('Failed to load user details');
    }
  }
}
