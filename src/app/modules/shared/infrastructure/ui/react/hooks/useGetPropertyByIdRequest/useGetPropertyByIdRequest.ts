import { usePropertiesRequestsContext } from '../../contexts/propertiesRequests/propertiesRequests.context';

type GetPropertyByIdReturn = ReturnType<typeof usePropertiesRequestsContext>['getPropertyByIdRequest'];

type GetPropertyByIdReturnValue = Awaited<ReturnType<GetPropertyByIdReturn>>;

type OnGetPropertyByIdArgs = Parameters<GetPropertyByIdReturn>[number];

interface UseGetPropertyByIdRequestReturn {
  onGetPropertyById: (arg: OnGetPropertyByIdArgs) => Promise<GetPropertyByIdReturnValue>;
  isPending: boolean;
  error: Error | null;
  data?: GetPropertyByIdReturnValue;
}

export const useGetPropertyByIdRequest = ({ propertyId }: OnGetPropertyByIdArgs): UseGetPropertyByIdRequestReturn => {
  const { getPropertyByIdRequest } = usePropertiesRequestsContext();

  const onGetPropertyById = getPropertyByIdRequest.bind(null, { propertyId });

  return {
    onGetPropertyById,
    isPending: false,
    error: null,
    data: undefined,
  };
};
