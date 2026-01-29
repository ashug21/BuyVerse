import imagekitServer from '../../../../lib/imagekitServer';

export async function GET(request) {
  try {
    const authenticationParameters = imagekitServer.getAuthenticationParameters();
    return Response.json(authenticationParameters);
  } catch (error) {
    console.error('ImageKit auth error:', error);
    return Response.json(
      { error: 'Failed to get authentication parameters' },
      { status: 500 }
    );
  }
}
